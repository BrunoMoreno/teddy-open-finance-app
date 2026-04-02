import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { numericTransformer } from '../../common/database/numeric.transformer';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('numeric', { precision: 12, scale: 2, transformer: numericTransformer })
  salary!: number;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    transformer: numericTransformer,
  })
  companyValue!: number;

  @Index({ unique: true, where: '"email" IS NOT NULL' })
  @Column('varchar', { nullable: true })
  email!: string | null;

  @Column('varchar', { nullable: true })
  phone!: string | null;

  @Column({ default: 0 })
  accessCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
