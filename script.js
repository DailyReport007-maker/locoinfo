document.addEventListener('DOMContentLoaded', function() {
    fetch('ELB.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            const locoSelect = document.getElementById('loco');

            // Initialize Select2
            $(locoSelect).select2({
                placeholder: 'Select LOCO',
                allowClear: true,
                width: 'resolve'
            });

            // Populate LOCO dropdown
            rows.forEach((row, index) => {
                if (index === 0) return; // Skip header row
                const locoOption = new Option(row[0], row[0], false, false);
                $(locoSelect).append(locoOption);
            });

            // Refresh Select2 to apply new options
            $(locoSelect).trigger('change');

            // Handle LOCO selection change
            $(locoSelect).on('change', function() {
                const selectedLOCO = this.value;
                const selectedRow = rows.find(row => row[0] === selectedLOCO);
                if (selectedRow) {
                    document.getElementById('type').value = selectedRow[1];
                    document.getElementById('zone').value = selectedRow[2];
                    document.getElementById('baseShed').value = selectedRow[3];
                    document.getElementById('division').value = selectedRow[4];
                    document.getElementById('doc').value = selectedRow[5];
                }
            });
        });
});
