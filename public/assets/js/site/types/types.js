$(document).ready(function () {
    $('.delete-types').on('click', function(e){
        e.preventDefault();
        const form = $(this).closest('form');
        if(confirm('Are you sure you want to delete this type?')){
            form.submit();
        }
    });
});