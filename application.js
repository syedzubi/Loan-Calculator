// Listen for submit 
document.getElementById('loan-form').addEventListener('submit', function(e) {
    //hide results initially 
    document.getElementById('results').style.display = 'none';

    //show results loader image 

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults() {
    //UI Vars

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalinterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute the monthy payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalinterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // hide loader 
        document.getElementById('loading').style.display = 'none';
        // show results 
        document.getElementById('results').style.display = 'block';

    } else {
        showError('Please check your input');
    }
}

function showError(error) {
    // hide loader 
    document.getElementById('loading').style.display = 'none';

    // hide results 
    document.getElementById('results').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');

    //Get elements above the heading by taking in the card and heading 

    const heading = document.querySelector('.heading');
    const card = document.querySelector('.card');

    //Adding a class
    errorDiv.className = 'alert alert-danger';

    // create a textNode and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //inserting the error 
    card.insertBefore(errorDiv, heading);

    //Clear the error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}