import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 } from 'uuid'
import { PetModule } from './pet.model'

@Injectable()
export class PetsService {
    pets: PetModule[] = []

    findPet(id: string): PetModule {
        const pet = this.pets.find(pet => pet.id === id)
        if (!pet) {
            throw new NotFoundException('Content not found')
        }
        return pet
    }

    insertPet(petInput: Partial<PetModule>) {
        const pet = new PetModule(v4(), petInput.name, petInput.description)
        this.pets.push(pet)
        return pet
    }

    fetchPets(): PetModule[] {
        return [...this.pets]
    }

    getPet(id: string): { data: PetModule; isValid: boolean } {
        const pet = this.findPet(id)
        return {
            data: pet,
            isValid: true,
        }
    }

    updatePet(payload: PetModule): PetModule {
        const pet = this.findPet(payload.id)
        const index = this.pets.findIndex(pet => pet.id === payload.id)
        const newPet = {
            ...pet,
            name: payload.name || pet.name,
            description: payload.description || pet.description,
        }
        this.pets.splice(index, 1).push(newPet)
        return newPet
    }

    deletePet(id: string): { data: null; isValid: boolean } {
        this.findPet(id)
        const index = this.pets.findIndex(pet => pet.id === id)
        this.pets.splice(index, 1)
        return {
            data: null,
            isValid: true
        }
    }
}

