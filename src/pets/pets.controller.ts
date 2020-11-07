import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PetsService } from './pets.service'
import { PetModule } from './pet.model'

@Controller('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}
    @Post()
    addPets(@Body('name') petName: string, @Body('description') petDescription: string): PetModule {
        //   Store the pets
        return this.petsService.insertPet({ name: petName, description: petDescription })
    }

    @Get()
    getPets(): { data: PetModule[]; isValid: boolean } {
        return {
            data: this.petsService.fetchPets(),
            isValid: true,
        }
    }

    @Get(':id')
    readPet(@Param('id') id: string): { data: PetModule; isValid: boolean } {
        return this.petsService.getPet(id)
    }

    @Patch(':id')
    updatePet(@Param('id') id: string, @Body('name') name: string, @Body('description') description: string) {
        return this.petsService.updatePet({id, name, description})
    }

    @Delete(':id')
    deletePet(@Param('id') id: string): { data: null; isValid: boolean } {
        return this.petsService.deletePet(id)
    }
}
