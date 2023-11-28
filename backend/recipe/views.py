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
        ingredients=json.loads(req["ingredients"]),
        instruction=json.loads(req["instruction"]),
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

def get_user_recipes(request):
    req = extractRequest(request)
    if "username" in req:
        user = User.objects.get(username=req["username"])
    else:
        user = req["session"]
    recipes = Recipe.objects.filter(auther=user).order_by("-created")
    recipes_dict = []
    for recipe in recipes:
        recipes_dict.append(recipe.toDict())

    return JsonResponse(recipes_dict)

def upload_recipe(request):
    try:
        file = request.FILES["file"]
        print(request.POST["auther_id"])
        recipe = Recipe(
            title=request.POST["title"],
            description=request.POST["description"],
            ingredients=json.loads(request.POST["ingredients"]),
            instructions=json.loads(request.POST["method"]),
            category=request.POST["category"],
            auther = User.objects.filter(pk=request.POST["auther_id"])[0],
            image=file,

        )
        recipe.save()
    except Exception as e:
        return ErrorResponse(str(e))

    return JsonResponse("asd")

def get_recipes(request):
    req = extractRequest(request)

    req["category"] = "" if req["category"] == "alla" else req["category"]

    recipes = []
    if "type" in req and req["type"] == "favorites":
        for rec in req["session"].favorit_recipies.all():
            recipe = Recipe.objects.filter(pk=rec.pk,category__contains=req["category"])
            if len(recipe) > 0:
                recipes.append(recipe[0])

    elif "type" in req and req["type"] == "follow":
        for rec in req["session"].follow.all():
            recipes+=(Recipe.objects.filter(auther=rec,category__contains=req["category"]))
    elif "type" in req and req["type"] == "feed":
        recipes = Recipe.objects.filter(category__contains=req["category"]).order_by("-created")
    elif "type" in req and req["type"] == "popular":
        recipes = Recipe.objects.filter(category__contains=req["category"]).order_by("-reviews")
    else :
        recipes = Recipe.objects.filter(category__contains=req["category"]).order_by("-created")



    recipes_dict = []
    for recipe in recipes:
        recipes_dict.append(recipe.toDict())

    return JsonResponse(recipes_dict)

def remove_recipe(request):
    req = extractRequest(request)
    pk = req["id"]
    recipe = Recipe.objects.get(pk=pk)
    recipe.delete()
    return JsonResponse("deleted")
