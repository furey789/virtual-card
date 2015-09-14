class CardMailer < ApplicationMailer

  default to: 'prfurey@gmail.com',
    from: 'nimbleten@gmail.com'

  def email_card(person,url)

    @name = person.first_name
    @url = url

    mail(to: person.email_address_recipients, subject: 'My new business card')

  end

end
