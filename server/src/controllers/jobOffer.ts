import { Request, Response } from "express";
import { Company, User } from "../models";
import JobOffer from "../models/jobOffer";
import { numArr2ObjArr } from "../utils";

// Controllers for Offer List

export const getOffersList = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try{
        if(!('page' in req.query) && !('companyId' in req.query)) {
            const offers = await JobOffer.find();
            return res.status(200).json(offers);
        }
        
        let company = undefined
        if('companyId' in req.query){
            const companyId: any = req.query.companyId
            company = await Company.findOneBy( {id: companyId} );
        } 
        
        const nOffers = 10;

        let  page : any = req.query.page || 1;
        page = parseInt(page);
        page = (page > 1) ? page : 1

        const skipJobOffers = nOffers * (page - 1)

        const [offers, totalCount] = await JobOffer.findAndCount({
            where: company ? { company: {id: company.id} } : {},
            relations: ['preferredSkills', 'requiredSkills', 'interestedAspirants', 'company'],
            select: {
                company: {
                    id: true,
                    name: true, 
                },
            },
            order:{'createdAt' : 'DESC'}, 
            take: nOffers,
            skip: skipJobOffers
        });
        return res.status(200).json({offers, totalCount});
    }catch (error) {
        console.log(error)
        
        let {code : errorCode}: any = error;
        if (errorCode === "22P02"){
            return res.status(404).json({ message: "Not found!" });
        }
        
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const createOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const company = await Company.findOneBy({user: {firebaseId: req.user_id}});
        if(!company) throw Error("Company wasn't found");
        const newJobOffer = JobOffer.create({
            ...req.body,
            company: company,
            preferredSkills: numArr2ObjArr(req.body.preferredSkills),
            requiredSkills: numArr2ObjArr(req.body.requiredSkills)
        });
        await newJobOffer.save();
        return res.status(200).json({ message: "Offer has been created successfully", jobOffer: { ...newJobOffer, company: company.id } });
    } catch (error) {
        return res.status(500).json({ message: "Something went wronng!", error });
    }
};

// Controlers for offer detail

export const removeJobOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const deletedEntity = await JobOffer.delete({ id: req.params.id });
        console.log(deletedEntity);
        if (!deletedEntity.affected)
            return res
                .status(409)
                .json({ message: "That entity does not exist!" });
        return res
            .status(200)
            .json({ message: `Offer ${req.params.id} deleted successfully!`,  deletedEntity});
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const getOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const offer = await JobOffer.findOne({
            where: {id: req.params.id},
            relations: ['preferredSkills', 'requiredSkills', 'interestedAspirants']
        });
        return res.status(200).json(offer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const updateOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const offer = await JobOffer.findOneBy({ id: req.params.id });

        if(!offer) return res.status(409).json({message: "Offer not found"});

        Object.assign(offer, req.body);
        
        const {preferredSkills, requiredSkills} = req.body; 

        offer.requiredSkills = numArr2ObjArr(requiredSkills);

        offer.preferredSkills = numArr2ObjArr(preferredSkills);

        await offer?.save();
        return res.status(200).json({ message: "Offer updated" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};
