
class CardMailerController < ApplicationController

  def create

    @person_user = User.last
    @url = session["card_url"]

    respond_to do |format|

        if @person_user

          CardMailer.email_card(@person_user, @url).deliver_now
          format.html { redirect_to 'http://localhost:3000/card_spec/'+@person_user.id.to_s, notice: 'A link to your card was successfully emailed!' }

        else

          format.html { redirect_to 'http://localhost:3000/card_spec', notice: 'No person. No email!' }

        end

    end

  end

end
