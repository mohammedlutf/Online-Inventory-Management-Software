from flask_restful import  reqparse, Resource
from orders import api, db
from orders.models import Orders,Orders_items,Products
from flask import json,jsonify,Response
from sqlalchemy import extract,func

class getproduct(Resource):
    def get(self):
        j={}
        product = Products.query.all()
        for y in product:
            j[y.name]=y.name
        return j

class getamount(Resource):
    def get(self):
        #barchart month over Sales
        q = db.session.query(func.sum(Orders.total_amount).label('Amount'),extract('year', Orders.date_creation),extract('month', Orders.date_creation)).group_by(extract('year', Orders.date_creation),extract('month', Orders.date_creation)).all()
        
        item = {}
        if [item for item in q if item[2] == 1] == []:
            item['jan'] = 0
        else :
            item['jan'] = [item for item in q if item[2] == 1][0][0]

        if [item for item in q if item[2] == 2] == []:
            item['feb'] = 0
        else :
            item['feb'] = [item for item in q if item[2] == 2][0][0]

        if [item for item in q if item[2] == 3] == []:
            item['mar'] = 0
        else :
            item['mar'] = [item for item in q if item[2] == 3][0][0]




        if [item for item in q if item[2] == 4] == []:
            item['apr'] = 0
        else :
            item['apr'] = [item for item in q if item[2] == 4][0][0]


        if [item for item in q if item[2] == 5] == []:
            item['may'] = 0
        else :
            item['may'] = [item for item in q if item[2] == 5][0][0]

        if [item for item in q if item[2] == 6] == []:
            item['jun'] = 0
        else :
            item['jun'] = [item for item in q if item[2] == 6][0][0]


        if [item for item in q if item[2] == 7] == []:
            item['july'] = 0
        else :
            item['july'] = [item for item in q if item[2] == 7][0][0]


        if [item for item in q if item[2] == 8] == []:
            item['aug'] = 0
        else :
            item['aug'] = [item for item in q if item[2] == 8][0][0]

        if [item for item in q if item[2] == 9] == []:
            item['sep'] = 0
        else :
            item['sep'] = [item for item in q if item[2] == 9][0][0]

        if [item for item in q if item[2] == 10] == []:
            item['oct'] = 0
        else :
            item['oct'] = [item for item in q if item[2] == 10][0][0]

        if [item for item in q if item[2] == 11] == []:
            item['nov'] = 0
        else :
            item['nov'] = [item for item in q if item[2] == 11][0][0]

        if [item for item in q if item[2] == 12] == []:
            item['dec'] = 0
        else :
            item['dec'] = [item for item in q if item[2] == 12][0][0]



        return item

api.add_resource(getproduct, '/api/product')
api.add_resource(getamount, '/api/totalamount')
