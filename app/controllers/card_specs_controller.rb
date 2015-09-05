
class CardSpecsController < ApplicationController

  def index

    # code = "THE_OAUTH_CODE_LINKEDIN_GAVE_ME"
    url_str = request.original_url
    start_id = url_str.index('code=')+5
    end_id = url_str.index('&state=')
    length = end_id-start_id
    code = url_str.slice(start_id,length)

    oauth = LinkedIn::OAuth2.new
    access_token = oauth.get_access_token(code)
    api = LinkedIn::API.new(access_token)
    person = api.profile(fields: ["first-name", "last-name", "headline", "location", "picture-url", "email-address", "public-profile-url"])
    person = person.to_hash  # first-name becomes first_name, etc.

    country =  person["location"]["country"]["code"].upcase
    if country == 'US'
      country = country +'A'
    end
    location = person["location"]["name"] + ", " + country

    @person_user = "no"
    User.all.each do |user|
      if user["first_name"] == person["first_name"] and user["last_name"] == person["last_name"] and user["email_address"] == person["email_address"]
        @person_user = user
      end
    end

    if @person_user == "no"
      User.create("first_name" => person["first_name"], "last_name" => person["last_name"], "headline" => person["headline"], "location" => location, "picture_url" => person["picture_url"], "email_address" => person["email_address"], "public_profile_url" => person["public_profile_url"] )
      @person_user = User.last
    end

  end

end
