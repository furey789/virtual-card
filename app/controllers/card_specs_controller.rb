
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
    @person = person.to_hash

    person_in_db = "no"
    Users.all.each do |user|
      if user["email_address"] == @person["email-address"]
        person_in_db = "yes"
      end
    end
    if person_in_db == "no"
      User.create("first_name" => @person["first-name"], "last_name" => @person["last-name"], "headline" => @person["headline"], "location" => @person["location"], "picture_url" => @person["picture-url"], "email_address" => @person["email-address"], "public_profile_url" => @person["public-profile-url"] )
    end

  end

end
