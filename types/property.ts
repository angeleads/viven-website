export interface Agent {
    id: number
    name: string
    phone: string
    email: string
    photo: string
  }
  
  export interface Property {
    id: number
    title: string
    description: string
    price: number
    location: string
    area: number
    beds: number
    baths: number
    type: string
    status: string
    image: string
    images: string[]
    features: string[]
    agent: Agent
    createdAt: string
  }
  