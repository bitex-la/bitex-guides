*Explicación de que es el servicio de concierge, y para que sirve.*

## Requisitos preeliminares
-- Tener una cuenta en bitex
-- Tener fondeada la cuenta de bitex.

# Crear el concierge request:
  - Tenés que elegir los ports.
  - Tenés que indicar a quines y cuanto. (link a la otra sección: que pasa si no están creadas las personas? como se crean? Link a
    otra guia)

# Pedir la cotización:
  - Once you're done indicating all the outputs, request a quote from us.
  - Explain a bit further about the ETA, what is it, why is it there?
    "Your quote may or may not be produced automatically, so you will get an ETA. (In some rare cases you may have to wait for your quote on business hours.)"
  - Mention that we may have an SLA for each customer forcing us to keep a short ETA or produce
    quotes immedately.
  - Mention it can be cancelled, link to the section about cancelling request.
  - Mention what's the request state at this point.

# Wait for your quote to be ready at the estimated time.
  - Mention they will get a callback. Maybe link to the callbacks guide. Build the callbacks guide.
  - Mention they can also poll for their request to see the status and quote.
  - What happens if they don't like the quote? See the cancelling section.
  - What happens if they like the quote? Nothing to be done.
  - Mention what's the request state at this point.

# Follow the money as payments are made
  - Mention what's the request state at this point.
  - The tracking is done per-output.
  - Talk in depth about all the states an output may have.
    - What's each state, what happened for it to get to that state.
  - Mention they will get web callbacks for each payment as it progresses. (link to callbacks guide)

# Once it's done, it's done.
  - You'll get a request finalization callback.

# Cancelling a request
  - When can a request be cancelled? Up to which state, and mention there's no cost if done quick.
  - How can it be cancelled?
  - What happens if I try to cancel afterwards? Cannot be cancelled, the balance will be deducted
    from your account. If you don't have enough funds you'll have a negative balance.

# Creating new people
  - Create the user (see the reference)
  - Fill in all the dockets (see the reference)
  - Mention the output will only start after we have run preeliminary checks on the payee.
  
