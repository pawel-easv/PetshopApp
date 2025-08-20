import {atom} from "jotai";

export interface Pet{
    id: string
    name: string
    breed: string
    imgurl: string
    sold: boolean
}

export const AllPetsAtom = atom<Pet[]>([])