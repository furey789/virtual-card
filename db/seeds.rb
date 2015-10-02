# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create("linkedin_id" => "A123B", "session_id" => nil, "first_name" => "Al", "last_name" => "Allen", "headline" => "Architect", "location" => "Alaska", "picture_url" => "none", "email_address" => "al@example.com", "public_profile_url" => "none", "email_address_recipients" => "none")
# User.create( first_name: "Al", last_name: "Allen", headline: "Architect", location: "Alaska", picture_url: "none", email_address: "al@example.com", public_profile_url: "none")
