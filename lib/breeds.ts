export type PetType = 'dog' | 'cat'
export type SizeCategory = 'small' | 'medium' | 'large' | 'giant'
export type RiskLevel = 'low' | 'medium' | 'high'

export interface Breed {
  name: string
  petType: PetType
  size: SizeCategory
  commonHealthIssues: string[]
  averageLifespan: string
  riskLevel: RiskLevel
}

export const breeds: Breed[] = [
  // Dogs
  { name: 'Labrador Retriever', petType: 'dog', size: 'large', commonHealthIssues: ['Hip dysplasia', 'Obesity', 'Ear infections', 'Eye conditions'], averageLifespan: '10-12 years', riskLevel: 'medium' },
  { name: 'Golden Retriever', petType: 'dog', size: 'large', commonHealthIssues: ['Cancer', 'Hip dysplasia', 'Heart disease', 'Skin allergies'], averageLifespan: '10-12 years', riskLevel: 'high' },
  { name: 'German Shepherd', petType: 'dog', size: 'large', commonHealthIssues: ['Hip dysplasia', 'Elbow dysplasia', 'Degenerative myelopathy', 'Bloat'], averageLifespan: '9-13 years', riskLevel: 'high' },
  { name: 'French Bulldog', petType: 'dog', size: 'small', commonHealthIssues: ['Brachycephalic syndrome', 'Spinal disorders', 'Allergies', 'Eye problems'], averageLifespan: '10-12 years', riskLevel: 'high' },
  { name: 'Pug', petType: 'dog', size: 'small', commonHealthIssues: ['Brachycephalic syndrome', 'Eye problems', 'Skin fold infections', 'Obesity'], averageLifespan: '12-15 years', riskLevel: 'high' },
  { name: 'Rottweiler', petType: 'dog', size: 'large', commonHealthIssues: ['Hip dysplasia', 'Cancer', 'Heart conditions', 'Cruciate ligament'], averageLifespan: '8-10 years', riskLevel: 'high' },
  { name: 'Boerboel', petType: 'dog', size: 'giant', commonHealthIssues: ['Hip dysplasia', 'Elbow dysplasia', 'Heart disease', 'Bloat'], averageLifespan: '9-11 years', riskLevel: 'high' },
  { name: 'Rhodesian Ridgeback', petType: 'dog', size: 'large', commonHealthIssues: ['Dermoid sinus', 'Hip dysplasia', 'Thyroid issues', 'Bloat'], averageLifespan: '10-12 years', riskLevel: 'medium' },
  { name: 'Dachshund', petType: 'dog', size: 'small', commonHealthIssues: ['Intervertebral disc disease', 'Obesity', 'Dental issues', 'Eye problems'], averageLifespan: '12-16 years', riskLevel: 'medium' },
  { name: 'Jack Russell Terrier', petType: 'dog', size: 'small', commonHealthIssues: ['Patellar luxation', 'Eye conditions', 'Deafness', 'Legg-Perthes disease'], averageLifespan: '13-16 years', riskLevel: 'low' },
  { name: 'Maltese', petType: 'dog', size: 'small', commonHealthIssues: ['Dental disease', 'Patellar luxation', 'Liver shunt', 'Eye problems'], averageLifespan: '12-15 years', riskLevel: 'low' },
  { name: 'Yorkshire Terrier', petType: 'dog', size: 'small', commonHealthIssues: ['Dental disease', 'Patellar luxation', 'Collapsed trachea', 'Liver shunt'], averageLifespan: '13-16 years', riskLevel: 'low' },
  { name: 'Staffordshire Bull Terrier', petType: 'dog', size: 'medium', commonHealthIssues: ['Skin allergies', 'Hip dysplasia', 'Eye conditions', 'Cruciate ligament'], averageLifespan: '12-14 years', riskLevel: 'medium' },
  { name: 'Border Collie', petType: 'dog', size: 'medium', commonHealthIssues: ['Hip dysplasia', 'Epilepsy', 'Collie eye anomaly', 'Deafness'], averageLifespan: '12-15 years', riskLevel: 'medium' },
  { name: 'Siberian Husky', petType: 'dog', size: 'medium', commonHealthIssues: ['Eye conditions', 'Hip dysplasia', 'Skin conditions', 'Hypothyroidism'], averageLifespan: '12-14 years', riskLevel: 'medium' },
  { name: 'Boxer', petType: 'dog', size: 'large', commonHealthIssues: ['Cancer', 'Heart conditions', 'Hip dysplasia', 'Bloat'], averageLifespan: '10-12 years', riskLevel: 'high' },
  { name: 'Doberman', petType: 'dog', size: 'large', commonHealthIssues: ['Dilated cardiomyopathy', 'Hip dysplasia', 'Von Willebrand disease', 'Wobbler syndrome'], averageLifespan: '10-12 years', riskLevel: 'high' },
  { name: 'Cocker Spaniel', petType: 'dog', size: 'medium', commonHealthIssues: ['Ear infections', 'Eye conditions', 'Hip dysplasia', 'Allergies'], averageLifespan: '12-15 years', riskLevel: 'medium' },
  { name: 'Beagle', petType: 'dog', size: 'medium', commonHealthIssues: ['Epilepsy', 'Hypothyroidism', 'Ear infections', 'Obesity'], averageLifespan: '12-15 years', riskLevel: 'low' },
  { name: 'Mixed Breed / Pavement Special', petType: 'dog', size: 'medium', commonHealthIssues: ['Varies widely', 'Generally healthier than purebreds', 'Dental disease', 'Skin conditions'], averageLifespan: '12-15 years', riskLevel: 'low' },

  // Cats
  { name: 'Domestic Shorthair', petType: 'cat', size: 'medium', commonHealthIssues: ['Dental disease', 'Obesity', 'Kidney disease', 'Urinary tract issues'], averageLifespan: '15-20 years', riskLevel: 'low' },
  { name: 'Persian', petType: 'cat', size: 'medium', commonHealthIssues: ['Brachycephalic syndrome', 'Kidney disease', 'Eye conditions', 'Dental issues'], averageLifespan: '12-17 years', riskLevel: 'high' },
  { name: 'Siamese', petType: 'cat', size: 'medium', commonHealthIssues: ['Respiratory issues', 'Dental disease', 'Amyloidosis', 'Cancer'], averageLifespan: '15-20 years', riskLevel: 'medium' },
  { name: 'Maine Coon', petType: 'cat', size: 'large', commonHealthIssues: ['Hip dysplasia', 'Heart disease', 'Spinal muscular atrophy', 'Kidney disease'], averageLifespan: '12-15 years', riskLevel: 'high' },
  { name: 'Bengal', petType: 'cat', size: 'medium', commonHealthIssues: ['Heart disease', 'Eye conditions', 'Patellar luxation', 'Anaesthetic sensitivity'], averageLifespan: '12-16 years', riskLevel: 'medium' },
  { name: 'Ragdoll', petType: 'cat', size: 'large', commonHealthIssues: ['Heart disease', 'Bladder stones', 'Obesity', 'Dental disease'], averageLifespan: '12-17 years', riskLevel: 'medium' },
  { name: 'British Shorthair', petType: 'cat', size: 'medium', commonHealthIssues: ['Heart disease', 'Obesity', 'Kidney disease', 'Dental disease'], averageLifespan: '12-20 years', riskLevel: 'medium' },
  { name: 'Abyssinian', petType: 'cat', size: 'medium', commonHealthIssues: ['Kidney disease', 'Hyperthyroidism', 'Dental disease', 'Eye conditions'], averageLifespan: '12-15 years', riskLevel: 'medium' },
  { name: 'Mixed Breed', petType: 'cat', size: 'medium', commonHealthIssues: ['Dental disease', 'Obesity', 'Kidney disease', 'Generally healthier'], averageLifespan: '15-20 years', riskLevel: 'low' },
]

export function getBreedsByPetType(petType: PetType): Breed[] {
  return breeds.filter(b => b.petType === petType).sort((a, b) => a.name.localeCompare(b.name))
}

export function getBreedByName(name: string): Breed | undefined {
  return breeds.find(b => b.name === name)
}
