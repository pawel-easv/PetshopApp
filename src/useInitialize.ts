import {Api} from '../PetsApi.ts'
import {AllPetsAtom} from "./atoms.ts";
import {useAtom} from "jotai";
import {useEffect} from "react";

export default function useInitialize(){
    const [, setAllPets] = useAtom(AllPetsAtom);
    const myApi = new Api();

    useEffect(()=>{
        myApi.getPets.petGetPets().then(response=>{
            response.json().then(json =>{
                setAllPets(json);
                console.log(JSON.stringify(json));
            })
        })
    },[])
}