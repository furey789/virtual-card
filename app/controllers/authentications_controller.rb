
class AuthenticationsController < ApplicationController

  def new
    oauth = LinkedIn::OAuth2.new
    @url = oauth.auth_code_url
  end

  def create

  end

end
