import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/* 
Clase abstracta no se puede instanciar pero si heredar.
Son atributos comunes que se comparten entre varias clases 
*/
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
