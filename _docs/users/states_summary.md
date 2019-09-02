---
layout: doc
title: "Issue and Person lifecycles"
section: User Management
index: 8
---

### An `Issue` lifecycle is as follows:

Issues are a way to process the initial due dilligence for a new `User`
account. They can also be used by our compliance team to request
further information during the account lyfecicle,
or for a customer to propose updates to their information.

#### <span class="badge badge-dark">draft</span>

The `Issue` has just been created and you're adding `Seeds` to it.

Once it's ready to be reviewed by our compliance team, you can 
<span class="badge badge-primary">complete</span> it, and its state becomes
<span class="badge badge-primary">new</span>.
You can just abandon an issue and our system will move it to the 
<span class="badge badge-danger">abandoned</span> state.

#### <span class="badge badge-primary">new</span>

The `Issue` is about to be reviewed by our compliance team, this may take
up to one working day.
After being reviewed, it will move to one of:
<span class="badge badge-warning">observed</span>,
<span class="badge badge-success">approved</span>,
<span class="badge badge-danger">rejected</span>.

#### <span class="badge badge-warning">observed</span>

The `Issue` has `Observations` that you must reply to.
It will move to 
<span class="badge badge-primary">answered</span> when you reply to all of them.
If you fail to do so after a while, our compliance team may move it to
<span class="badge badge-danger">dismissed</span> or the system may make it
<span class="badge badge-danger">abandoned</span>.

#### <span class="badge badge-primary">answered</span>

You've replied to the `Issue's` `Observations` and will be reviewed again.
After being reviewed, it will move to one of:
<span class="badge badge-warning">observed</span> (again),
<span class="badge badge-success">approved</span> or
<span class="badge badge-danger">rejected</span>.

#### <span class="badge badge-success">approved</span>

The `Issue's` `Seeds` are now part of the `Person's` permanent file. If this
was the `Person's` first `Issue`, then it will be 
<span class="badge badge-success">enabled</span> automatically.

#### <span class="badge badge-danger">rejected</span>

Our compliance team rejected adding this `Issue's` `Seeds` to the `Person's`
permanent file.
The `Issue` rejection has no direct automatic effect in the `Person's` state,
so you should check the `Person` to see if it changed.

#### <span class="badge badge-danger">dismissed</span>

Our compliance team dismissed the `Issue`. This may happen if it has long standing
unreplied observations, becomes irrelevant, or it seems to have been created by accident.

#### <span class="badge badge-danger">abandoned</span>

All `Issues` that spend weeks in a non-final state will be picked up and 
abandoned by our system.

### A `Person` lifecycle is as follows:

#### <span class="badge badge-dark">new</span>

A `User` has just been created, and this `Person` was created along with it,
to track all the aspects pertaining to our compliance program.

#### <span class="badge badge-success">enabled</span>

When a `Person's` first issue is <span class="badge badge-success">approved</span>,
the `Person` is also <span class="badge badge-success">enabled</span>.  
A `Person's` state is independent from the state of their `Issues`.
Having an `Issue` approved does not mean the person will be enabled.
The next possible states are 
<span class="badge badge-warning">disabled</span> or
<span class="badge badge-danger">rejected</span>.

#### <span class="badge badge-warning">disabled</span>

Our compliance team is always monitoring transactional risk profiles and
keeping customer information updated. Sometimes, when transactional risk
increases, the `Person` will be temporarily disabled, and an `Issue` will
be created with some `Observations` for them to reply.

If a `Person` is <span class="badge badge-warning">disabled</span>
and you can't find an `Issue` with `Observations`
to reply to, it means the investigation is internal and we will update
the `Person's` status to 
<span class="badge badge-success">enabled</span> or
<span class="badge badge-danger">rejected</span>.

#### <span class="badge badge-danger">rejected</span>

The `Person` account has been permanently suspended.


