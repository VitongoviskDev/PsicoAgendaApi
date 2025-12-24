export interface ApiResponse<T = any> {
    message: string;     // Mensagem amigável para UI / toast
    data?: T;            // Conteúdo da resposta
    error?: any;         // Detalhe técnico do erro (quando tiver)
    status: number;      // HttpStatus code
}