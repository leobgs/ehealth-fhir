import axios from "axios"

const baseUrl = "https://api.staging.ehealth.id/fhir/"
const baseComposition = "Composition/?date=ge2025-04-01&date=le2025-04-30"

async function getRefference(reference){
    try{
        const response = await axios.get(`${baseUrl}${reference}`)
        return response?.data
    } catch(error){
        console.error(error)
    }
}

async function getData(){
    console.log("Tunggu sedang Load Data...")
    try{
    const response = await axios.get(`${baseUrl}${baseComposition}`)
    const datas = response?.data?.entry?.[0]?.resource?.section?.[6]?.entry
    for(const data of datas){
        const ref = data?.reference
        console.log(ref)
        if(ref){
            const res = await getRefference(ref)
            if(res){
                console.log(res?.code?.coding?.[0]?.system?.includes("icd-10") ? res?.code?.coding?.[0]?.system : "tidak ada" )
            }
        }
    }
    } catch(error){
        console.error(error)
    }
}

getData()