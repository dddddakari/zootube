import { Schema, model, models } from 'mongoose'; // probably mongoose or another ORM

const AnimalSchema = new Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  habitat: { type: String, required: true },
  diet: { type: String, required: true },
  conservationStatus: { type: String, required: true },
  description: { type: String, required: true },
  funFacts: [{ type: String }],
  images: [{ type: String }],
  location: { type: String, required: true },
  featured: { type: Boolean, default: false }
});

const Animal = models.Animal || model('Animal', AnimalSchema);

export default Animal;