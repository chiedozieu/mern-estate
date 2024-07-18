const displayNGNCurrency = (num) => {
    const Naira = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    })
    return Naira.format(num)
}

export default displayNGNCurrency;