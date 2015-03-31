from flask import Flask
from flask import redirect
from flask import render_template
from flask import session
from flask import request
from flask import escape
from flask import url_for
#import mysql_connector

from flask import jsonify
import json
import urllib
from urllib import quote


app = Flask(__name__)

app.secret_key = 'Jordan'

@app.route('/', methods=["GET"])
def index():
	session.pop('search', None)
	session.pop('text', None)
	headline = []
	url = "static/stream.json"
	loadurl = urllib.urlopen(url)
	data = json.loads(loadurl.read().decode(loadurl.info().getparam('charset')or 'utf-8'))
	#temp = data['']
	# results = len(headline)
# 	
# 	for item in headline:
# 		print item['thumbnail_standard']
# 	
# 	titleSplit = []
# 	for item in headline:
# 		temp = item['title'].split()
# 		titleSplit.append(temp)
	
	return render_template("body.html", data = data)


if __name__ == '__main__':
	app.run(debug=True)