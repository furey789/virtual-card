class CardMailer < ApplicationMailer

  default from: 'nimbleten@gmail.com'

  def email_card(person,url)

    @name = person.first_name
    @url = url
binding.pry
    mail(to: 'prfurey@gmail.com', subject: 'My new business card')

  end

end
