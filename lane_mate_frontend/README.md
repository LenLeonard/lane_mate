# lane_mate

Carrier quote management for Freight Brokerages

## Use Case Summary

Freight brokers act as an intermediary between shippers, who have freight to ship, and carriers, who have trucks to move it.
A shipper will give a contract to move a load to a broker, who will then hire a carrier to peform the work.
Often, a broker will have to go to the open market to find a truck to complete the job and 'cover the load.'
This involves posting the load on a loadboard, inviting several carriers to call the broker and make an offer on the load.
Typically, the broker would keep track of the offers by writing them down on paper, or entering them into a .txt file.

lane_mate is a simple application that handles the data entry involved in receiving spot market quotes from trucking companies in real time over the phone. 
The information defining the quote request, including the customer, lane, and load is stored along side all of a table of the carriers who made offers on it.
The user can easlily search for quotes they've received in the past, which could prove useful for saving time in quoting a customer themselves.
It is often the case that a customer asks a broker for a quote without guarentee that the job will be awarded, but is looking for a ball park rate on a lane.
If the broker, or someone in their office, has already quoted this lane several times, they should be able to use the information gathered in lane_mate to give 
a rough estimate of how much it would cost to perform the same job again. In short the app aspires to do two things:
1) Handle and organize the data entry associated with taking quotes/offers from several carriers on a given job.
2) Provides the user with a searchable database of these quote requests, and helps the user make the most of this information.

## Basic User Flow
1) User receives a quote request from a customer in an email.
2) They open lane_mate and enter the quote request information by clicking 'Create Quote Request' and filling out the form.
3) They post the load on the load board, and wait for carriers to call with offers.
4) While fielding calls from carreirs, the user fills out the form for each carrier and adds their information their rate/offer to the table.
5) Once the broker has gathered enough offers, they save the quote request so that it can be retrieved later. 
6) The broker selects a winning carrier, adds their margin, and resonds to the customer with a quote.

