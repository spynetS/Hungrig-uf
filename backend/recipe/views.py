from django.shortcuts import render
from requestHandler import *
from recipe.models import Recipe, Comment
import json

# Create your views here.
def create_recipe(request):
    req = extractRequest(request)
    recipe = Recipe(
        title=req["title"],
        description=req["description"],
        ingredients=req["ingredients"],
        instruction=req["instruction"],
        preperations_time=req["preperations_time"],
        cooking_time=req["cooking_time"],
        servings=req["servings"],
        difficulty=req["difficulty"],
        category=req["category"],
        notes=req["notes"],
    )
    recipe.auther = req["session"]

    return JsonResponse("sucess")

def add_comment(request):
    req = extractRequest(request)

    comment = Comment(content=req["content"])
    comment.auther = req["session"]
    comment.save()

    recipe = Recipe.objects.filter(pk=req["recipe"])[0]
    recipe.comments.add(comment)

    return HttpResponse("sucess")



def remove_comment(request):
    req = extractRequest(request)
    comment = Comment.objects.get(pk=req["id"],auther=req["session"])
    comment.delete()

    return HttpResponse("sucess")

def edit_recipe(requst):
    pass

def get_recipes(request):
    req = extractRequest(request)

    if "category" in req and req["category"] != "" and req["category"] != "alla":
        recipes = Recipe.objects.filter(category__contains=req["category"])
    else:
        recipes = Recipe.objects.filter()


    recipes_dict = []
    for recipe in recipes:
        recipes_dict.append(recipe.toDict())

    return JsonResponse(recipes_dict)

def remove_recipe(request):
    pass
