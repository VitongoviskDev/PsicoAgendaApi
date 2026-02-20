# Documentação: Fluxo de Cadastro de Pacientes

Este documento resume as mudanças e os novos arquivos criados para suportar o cadastro de pacientes, garantindo a soberania das clínicas e a integração opcional com usuários do aplicativo.

## Arquivos Criados/Modificados

### 1. Entidades (Banco de Dados)
- **`src/patient-profile/entities/patient-profile.entity.ts`**:
    - Armazena dados específicos do paciente dentro de uma clínica (como o `code` interno).
    - Agora possui um vínculo `OneToOne` com `UserClinic` (representando a relação única entre um usuário e uma clínica naquele papel).
- **`src/user-clinic/entities/user-clinic.entity.ts`**:
    - Ajustado para refletir a relação singular com `PatientProfile`.
- **`src/clinics/entity/clinic.entity.ts`**:
    - Corrigido o mapeamento da relação `userClinics`.

### 2. DTOs (Data Transfer Objects)
- **`src/patient-profile/dto/register-patient.dto.ts`**:
    - Define os campos aceitos na criação de um paciente (ID do usuário ou dados completos como CPF, Nome, Email, Celular).

### 3. Lógica de Negócio (Services)
- **`src/users/users.service.ts`**:
    - Adicionado método `findByCpf` para facilitar a identificação de usuários globais.
- **`src/patient-profile/patient-profile.service.ts`**:
    - **`checkPatientByCpf`**: Verifica se um CPF já existe no app e se já é paciente na clínica atual.
    - **`registerPatient`**: 
        - Se o usuário já existe, vincula-o à clínica.
        - Se não existe, cria um "usuário fantasma" (pendente de registro de senha no app) para manter o registro soberano da clínica.
        - Cria o `PatientProfile` com os dados clínicos.

### 4. API (Controllers)
- **`src/patient-profile/patient-profile.controller.ts`**:
    - `GET /patient-profiles/check/:cpf`: Rota usada pelo front para checar o status do CPF antes do cadastro.
    - `POST /patient-profiles/register`: Rota principal para cadastrar ou vincular um paciente.

---
## Fluxo Sugerido para o Frontend
1. O usuário digita o CPF do paciente.
2. O front chama a rota `check/:cpf`.
3. Se o back retornar um `user`, o front pode apenas confirmar os dados.
4. O front envia o `register` com o `userId` (se existir) ou os dados completos (se for novo).
5. O paciente é criado e vinculado à clínica instantaneamente.
