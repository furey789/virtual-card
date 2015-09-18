
class CardSpecsController < ApplicationController

  before_action :ensure_login, only: [:edit,:update]

  def new

    url_str = request.original_url
    person = User.get_person_data(url_str)
    @person_user = User.find_by(linkedin_id: person["id"])

    if @person_user == nil

      country =  person["location"]["country"]["code"].upcase
      if country == 'US'
        country = country +'A'
      end
      location = person["location"]["name"] + ", " + country
      User.create("linkedin_id" => person["id"], "first_name" => person["first_name"], "last_name" => person["last_name"], "headline" => person["headline"], "location" => location, "picture_url" => person["picture_url"], "email_address" => person["email_address"], "public_profile_url" => person["public_profile_url"] )
      @person_user = User.last

    end

    session[:user_id] = @person_user.id
    session[:loggedin] = "yes"

  end

  def show

    @person_user = User.find(params[:id])

    if ( session[:user_id] == nil )
      session[:user_id] = @person_user.id
      session[:loggedin] = nil
    end

  end

  def edit

    @person_user=User.find(params[:id])

  end

  def update

    @person_user=User.find(params[:id])

    if params[:user] != nil
      @person_user.update(person_user_params)
      render json: {state: "success"}
      flash[:notice]="Your card was successfully updated!"
    else
      render json: {state: "success"}
      flash[:alert]="You made no changes to your card."
    end

  end

  def destroy

    session[:user_id] = nil
    session[:loggedin] = nil
    redirect_to root_path

  end

  def get_data

    pagetitle = "Your Virtual Business Card"

    person_user = User.find(session[:user_id])
    person_user = JSON.parse(person_user.to_json)
    # ActiveRecord objects are weird!

    loggedin = session[:loggedin]
    if loggedin == nil
      loggedin = "no"
    end

    data = person_user
    data["loggedin"] = loggedin
    data["pagetitle"] = pagetitle

    render json: data.to_json

  end


  private

  def person_user_params
    params.require(:user).permit(:first_name,:last_name,:headline,:location,:email_address,:email_address_recipients)
  end

end
