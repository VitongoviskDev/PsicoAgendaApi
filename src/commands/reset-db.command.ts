import { Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';

@Command({
    name: 'db:reset',
    description: 'Limpa todos os dados de todas as tabelas do banco de dados (Truncate)',
})
@Injectable()
export class ResetDatabaseCommand extends CommandRunner {
    constructor(private readonly dataSource: DataSource) {
        super();
    }

    async run(): Promise<void> {
        console.log('--- Iniciando Reset do Banco de Dados ---');

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            // Pegar todos os nomes de tabelas do schema public
            const tables = await queryRunner.query(`
                SELECT tablename 
                FROM pg_catalog.pg_tables 
                WHERE schemaname = 'public' 
                AND tablename != 'migrations';
            `);

            if (tables.length === 0) {
                console.log('Nenhuma tabela encontrada para limpar.');
                return;
            }

            console.log(`Limpando ${tables.length} tabelas...`);

            // Desabilitar triggers (como FKs) temporariamente para o truncate
            // O TRUNCATE ... CASCADE no Postgres já resolve a maioria dos casos, 
            // mas rodar tudo em um comando só com RESTART IDENTITY é melhor.

            const tableNames = tables
                .map((t: { tablename: string }) => `"${t.tablename}"`)
                .join(', ');

            await queryRunner.query(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`);

            console.log('✅ Banco de dados zerado com sucesso (Tabelas truncadas).');
        } catch (error) {
            console.error('❌ Erro ao zerar o banco de dados:', error.message);
        } finally {
            await queryRunner.release();
        }
    }
}
