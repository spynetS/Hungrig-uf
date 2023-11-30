from django.shortcuts import render
from requestHandler import *
from django.http import HttpResponse
import json
from identification.models import User, Session
import time


def deleteSession(request):
    if request.method == "POST":
        req = extractRequest(request)
        if req["session"].admin:
            sessionid = req["sessionKey"]
            session = Session.objects.filter(key=sessionid)[0]
            session.delete()

            return HttpResponse("Session was deleted")
        return ErrorResponse("Not admin")
    return ErrorResponse("Wrong Method")


def getSessions(request):
    if request.method == "POST":
        req = extractRequest(request)
        if req["session"].admin:
            sessions = Session.objects.all()
            s = []
            for session in sessions:
                s.append({
                    "long":session.long,
                    "lat":session.lat,
                    "created":session.created.timestamp(),
                    "name":session.user.username,
                    "key":session.key,
                    "is_admin":session.user.admin,
                })
            return JsonResponse(s)
        return ErrorResponse("wrong key")
    return ErrorResponse("wrong method")


def log_in(request):
    if request.method == "POST":
        req = extractRequest(request)
        username = req["username"]
        password = argon(req["password"])
        users = User.objects.filter(username=username, password=password)
        if len(users) == 0:
            return JsonResponse({"code":"Wrong credentials"},status=401)
        
        session = Session(user=users[0],
                          key=argon(password+str(time.time())),
                          )
        session.save()

        return JsonResponse({"sessionKey":session.key})

def upload_profile_picture(request):
    user = extractSession(request)
    file = request.FILES["file"]

    user.profile_picture = file
    user.save()
    return JsonResponse("asd")

def toggle_follow(request):
    req = extractRequest(request)

    user = req["session"]
    for fellow in user.follow.all():
        if req["id"] != user.pk and fellow.pk == req["id"]:
            user.follow.remove(fellow)
            user.save()
            return JsonResponse("removed")

    user.follow.add(req["id"])
    user.save()
    return JsonResponse("added")

def get_user_info(request):
    if request.method == "POST":
        req = extractRequest(request)
        if "username" in req:
            return JsonResponse(User.objects.get(username=req["username"]).toDict())
        else:
            print(req)
            # if "session" != req:
            #     return ErrorResponse("no session")
            user = req["session"]
            return JsonResponse(user.toDict())
    return ErrorResponse("asd")

def get_users(request):
    if request.method == "GET":
        req = extractRequest(request)
        users = []
        for user in User.objects.all():
            users.append({"username":user.username, "pk":user.pk})
        print(users)
        return JsonResponse(users)
    return ErrorResponse("wrong method")


def create_user(request):
    if request.method == "POST":
        req = extractRequest(request)
        try:
            username = req["username"]
            password = argon(req["password"])

            users = User.objects.filter(username=username)
            if len(users) > 0:
                return JsonResponse({"code":"User allredy exists"},status=400)

            new_user = User(
                username=username, 
                password=password,
            )
            new_user.save()
            return JsonResponse({"code":"User created"},status=201)

        except Exception as e:
            return JsonResponse({"error":"Something went wrong","value":str(e)},status=400)
        
    return JsonResponse({"code":"Wrong method"},status=404)

def set_favorit_recipe(request):
    from recipe.models import Recipe
    req = extractRequest(request)

    user = req["session"]
    if "add_fav" in req:
        user.favorit_recipies.add(Recipe.objects.get(pk=req["add_fav"]))
    else:
        user.favorit_recipies.remove(Recipe.objects.get(pk=req["del_fav"]))
    return JsonResponse("sucess")
