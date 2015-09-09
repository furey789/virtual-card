
class CardSpecsController < ApplicationController

  def new

    person = User.get_person_data
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

    session[:user_id]=@person_user.id

  end

  def show
    @person_user = User.find(params[:id])
  end

  def edit
    @person_user=User.find(params[:id])
  end

  def update
    @person_user=User.find(params[:id])
    if @person_user.update(person_user_params)
      flash[:notice]="Your card was successfully updated!"
      redirect_to card_spec_path(@person_user)
    else
      render :edit
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private

  def person_user_params
    params.require(:user).permit(:first_name,:last_name,:headline,:location,:email_address)
  end

end
