# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Faker::Config.locale = :fr

# User.destroy_all
# acard = User.create!(name: "acard", email: "acardnicolas@hotmail.com", password:"password", admin: true)
# Ad.destroy_all

# 5.times do

#   password = Faker::Internet.password(8)
#   user = User.create!(name: Faker::Name.last_name, email: Faker::Internet.email, password: password, pilote: false)
#   user.picture = Faker::Avatar.image(user.name.parameterize, "50x50")
#   puts user.picture
#   user.save

#   1.times do
#     #address = Faker::Address.street_address +', Paris'
#     address = "place de la bastille, Paris"
#     annonce = Ad.create(description: Faker::Lorem.paragraph, price: Faker::Number.number(2), flight_date: Date.today, flight_time: Faker::Number.number(2), address: address)
#     annonce.user = user
#     article = Article.create(title: Faker::Book.title, description: Faker::Lorem.paragraph, video_url: Faker::Internet.url)
#     article.user = user
#     image_url = Faker::Avatar.image(('Vol depuis ' + Faker::Address.city).parameterize, "300x150", "jpg")
#     annonce.remote_photo_url = image_url
#     annonce.save!
#     puts address
#   end
# end

# 5.times do
#   Aeronef.create!(type: 'toto', nom: 'estive', cylindre: '40CV', annee: '1999', equipement: 'plein de truc', vitesse: '200km/h')
# end


Review.create!(reviewer_id: 7, reviewed_id: 5, description: 'Lorem upsum', user_id: 5)


# puts "#{User.count} user, #{Ad.count} et #{Article.count} annonces crées !"
# password = Faker::Internet.password(8)
#   user = User.create!(name: Faker::Name.last_name, email: Faker::Internet.email, password: password, pilote: true)
#   user.picture = Faker::Avatar.image(user.name.parameterize, "50x50")
#   puts user.picture
#   user.save


# address = "place de la bastille, Paris"
#     annonce = Ad.create(description: Faker::Lorem.paragraph, price: Faker::Number.number(2), flight_date: Date.today, flight_time: Faker::Number.number(2), address: address)
#     annonce.user = user
#     article = Article.create(title: Faker::Book.title, description: Faker::Lorem.paragraph, video_url: Faker::Internet.url)
#     article.user = user
#     image_url = Faker::Avatar.image(('Vol depuis ' + Faker::Address.city).parameterize, "300x150", "jpg")
#     annonce.remote_photo_url = image_url
#     annonce.save!
