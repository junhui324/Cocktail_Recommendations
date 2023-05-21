import React from 'react';

interface CategoryType {
  [key: string]: string;
}

const CATEGORY: CategoryType = {
  GIN: 'Gin',
  VODKA: 'Vodka',
  ORDINARY_DRINK: 'Ordinary Drink',
  COCKTAIL: 'Cocktail',
  SHAKE: 'Shake',
  COCOA: 'Cocoa',
  SHOT: 'Shot',
  COFFEE_TEA: 'Coffee / Tea',
  HOMEMADE_LIQUER: 'Homemade Liqueur',
  PUNCH_PARTY_DRINK: 'Punch / Party Drink',
  BEER: 'Beer',
  SOFT_DRINK: 'Soft Drink',
  OTHER: 'Other / Unknown',
};

export default CATEGORY;
