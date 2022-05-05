import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import JobOffer from "./jobOffer";


@Entity()
class Company extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column()
    name : string;

    @Column()
    vision : string;

    @Column({ nullable: false })
    mision : string;

    @Column({ nullable: false })
    address : string;

    @Column({ nullable: false })
    phone1 : `${number}`;

    @Column()
    phone2 : `${number}`;

    @OneToMany(()=>JobOffer, (jobOffer) => jobOffer.company)
    jobOffers : JobOffer[];
}

export default Company;