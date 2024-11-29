import { getAttractionByIdService, getAllAttractionsService, createAttractionService, updateAttractionService, deleteAttractionService } from "../services/attractionService";

export const getAttractions = async (params = {}) => {
  try {
    const response = await getAllAttractionsService(params);
    console.log('Attractions fetched:', response);
    return response // Assurez-vous que la structure de la réponse est correcte
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
};

export async function getAttractionById(req, res) {
    try {
        const { id } = req.params;
        const attraction = await getAttractionByIdService(id);
        if (!attraction) {
            return res.status(404).json({ message: 'Attraction non trouvée.' });
        }
        res.status(200).json(attraction);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'attraction.', error: error.message });
    }
}

export async function createAttraction(req, res) {
    try {
        const newAttraction = await createAttractionService(req.body);
        if (!newAttraction) {
            return res.status(400).json({ message: 'Erreur lors de la création de l\'attraction.' });
        }
        res.status(201).json(newAttraction);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'attraction.', error: error.message });
    }
}

export async function updateAttraction(req, res) {
    try {
        const { id } = req.params;
        const updatedAttraction = await updateAttractionService(id, req.body);
        if (!updatedAttraction) {
            return res.status(404).json({ message: 'Attraction non trouvée.' });
        }
        res.status(200).json(updatedAttraction);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'attraction.', error: error.message });
    }
}

export async function deleteAttraction(req, res) {
    try {
        const { id } = req.params;
        const deletedAttraction = await deleteAttractionService(id);
        if (!deletedAttraction) {
            return res.status(404).json({ message: 'Attraction non trouvée.' });
        }
        res.status(200).json({ message: 'Attraction supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'attraction.', error: error.message });
    }
}
