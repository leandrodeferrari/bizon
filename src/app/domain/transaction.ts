export interface Transaction {
    id:          number;
    fecha:       Date;
    monto:       string;
    descripcion: string;
    categoria:   string;
    emisor_id:   number;
    receptor_id: number;
    createdAt:   Date;
    updatedAt:   Date;
}