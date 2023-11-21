function DataTableED(selectorTabla) {
    $(`${selectorTabla} th`).on('click',function() {
        const column = $(this).data('column');
        const order = $(this).hasClass('asc') ? 'desc' : 'asc';

        // Remueve las clases de orden de las demás columnas
        $(`${selectorTabla} th`).removeClass('asc desc');
        $(this).addClass(order);

        // Llama a la función de ordenación con la columna y dirección
        ordenarTabla(selectorTabla, column, order);
    });

    function ordenarTabla(selectorTabla, columna, direccion) {
        const tbody = $(`${selectorTabla} tbody`);
        const filas = tbody.find('tr').toArray();

        filas.sort(function(a, b) {
            const valorA = $(a).find(`td:eq(${getColumnIndex(selectorTabla, columna)})`).text();
            const valorB = $(b).find(`td:eq(${getColumnIndex(selectorTabla, columna)})`).text();

            if (!isNaN(valorA) && !isNaN(valorB)) {
                return direccion === 'asc' ? parseFloat(valorA) - parseFloat(valorB) : parseFloat(valorB) - parseFloat(valorA);
            } else {
                return direccion === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
            }
        });

        tbody.empty().append(filas);
    }     

    function getColumnIndex(selectorTabla, columna) {
        const headers = $(`${selectorTabla} th`);
        return headers.filter(`[data-column=${columna}]`).index();
    }
}
