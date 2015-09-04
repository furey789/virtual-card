
class WelcomeController < ApplicationController

  def index
    oauth = LinkedIn::OAuth2.new
    @url = oauth.auth_code_url
  end

end
