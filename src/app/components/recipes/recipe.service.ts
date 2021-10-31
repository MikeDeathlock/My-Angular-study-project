import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from 'src/app/shared/ingediant.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe('The best Munchen Shnitzel', 'It is too good', 'https://www.yabpoela.com/uploads/posts/2019-08/1565089142_img_20190806_100038.jpg', [
  //     new Ingredient('Meat', 1), 
  //     new Ingredient('French Fries', 20)
  //   ]),
  //   new Recipe('Big fat Burger', 'Very delicious', 'https://img.povar.ru/main/21/c8/ab/38/burger_cezar-635279.jpg', [
  //     new Ingredient('Buns', 1), 
  //     new Ingredient('Meat', 1)
  //   ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService:ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
