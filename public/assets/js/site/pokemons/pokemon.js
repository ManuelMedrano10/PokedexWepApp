$(document).ready(function () {
    $('.delete-pokemons').on('click', function(e){
        e.preventDefault();
        const form = $(this).closest('form');
        if(confirm('Are you sure you want to delete this region?')){
            form.submit();
        }
    });
});