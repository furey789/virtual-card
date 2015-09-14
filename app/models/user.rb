
class User < ActiveRecord::Base

  def self.get_person_data(url_str)

    start_id = url_str.index('code=')+5
    end_id = url_str.index('&state=')
    length = end_id-start_id
    code = url_str.slice(start_id,length)

    oauth = LinkedIn::OAuth2.new
    access_token = oauth.get_access_token(code)
    api = LinkedIn::API.new(access_token)
    person = api.profile(fields: ["id", "first-name", "last-name", "headline", "location", "picture-url", "email-address", "public-profile-url"])
    person = person.to_hash  # first-name becomes first_name, etc.

    # person = {"id"=> "A123B123C", "first_name"=>"Peter", "headline"=>"Software developer", "last_name"=>"Furey", "email_address" => nil, "location"=>{"country"=>{"code"=>"us"}, "name"=>"Greater Denver Area"}, "picture_url"=>"https://media.licdn.com/mpr/mprx/0__VB2QOoZ4enqhLEF52SCCMeM4sFe6vVILO7C_wxZZZHd6LcFdVf2IObMOJNe6qBE52i2a4XJq0wW5l9b2WtrmoWzl0wH5APwWWtf5Iy4sOYk7FecL4XTLxtdAEl42AXsho9hGJ-bh_l", "public_profile_url"=>"https://www.linkedin.com/pub/peter-furey/7/aba/8a4"}

  end

end
