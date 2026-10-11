'use client'
import { food_items } from "@/components/Foodlist"
import { useState, createContext, ReactNode } from "react"

type FoodContextType = {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  getdata: typeof food_items
  setGetdata: React.Dispatch<React.SetStateAction<typeof food_items>>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  add: typeof food_items
  setAdd: React.Dispatch<React.SetStateAction<typeof food_items>>
  orderPlaced: boolean
  setOrderPlaced: React.Dispatch<React.SetStateAction<boolean>>
}

export const FoodContext = createContext<FoodContextType | undefined>(undefined)

export const Food = ({children}:{children:ReactNode}) => {
  const [input,setInput] = useState("")
  const [getdata, setGetdata] = useState(food_items)
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState<typeof food_items>([])
  const [orderPlaced, setOrderPlaced] = useState(false);

  const data ={
    input,setInput,getdata,setGetdata,open,setOpen,setAdd,add,setOrderPlaced,orderPlaced
  }
  return (
      <FoodContext.Provider value={data}>
      {children}
      </FoodContext.Provider>
  )
}

