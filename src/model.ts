import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

//Les proprietes d'un equipement dans notre SQL Lite

@Entity()
export class Equipement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @Column()
  image: string;

  @Column('text')
  description: string;

  @Column()
  prix: number;

  @Column()
  quantite: number;
}

let connection:Connection;

// definition du Model Equipement

export async function getEquipementRepository(): Promise<Repository<Equipement>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'nest',
      synchronize: true,
      entities: [
        Equipement
      ],
    });
  }
  return connection.getRepository(Equipement);
}