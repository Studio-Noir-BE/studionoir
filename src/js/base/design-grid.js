const initiateGrid = () => {
    const $designGrid = document.querySelector('.design-grid');

    if($designGrid) {
        const $toggle = document.createElement('div');
        const $toggleIcon = document.createElement('div');
        const $toggleIconLine1 = document.createElement('div');
        const $toggleIconLine2 = document.createElement('div');
        const $toggleIconLine3 = document.createElement('div');
        const $toggleIconLine4 = document.createElement('div');
        
        $toggle.appendChild($toggleIcon);
        $toggleIcon.appendChild($toggleIconLine1);
        $toggleIcon.appendChild($toggleIconLine2);
        $toggleIcon.appendChild($toggleIconLine3);
        $toggleIcon.appendChild($toggleIconLine4);
        document.documentElement.appendChild($toggle);

        $toggle.classList.add('design-grid--toggle');
        $toggleIcon.classList.add('design-grid--toggle-icon');
        $toggleIconLine1.classList.add('design-grid--toggle-icon--line1');
        $toggleIconLine2.classList.add('design-grid--toggle-icon--line2');
        $toggleIconLine3.classList.add('design-grid--toggle-icon--line3');
        $toggleIconLine4.classList.add('design-grid--toggle-icon--line4');

        if(!$designGrid.classList.contains('not-visible')) {
            $toggle.classList.add('active');
        }

        $toggle.addEventListener('click', () => {
            $designGrid.classList.toggle('not-visible');
            $toggle.classList.toggle('active');

            var today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000*24*14);

            const cookieName = 'designgrid';
            let gridActive = false;

            if($toggle.classList.contains('active')) {
                gridActive = true;                
            }

            document.cookie = cookieName+"="+encodeURI(gridActive) + ";expires="+expire.toGMTString();
        })
    }
}

initiateGrid();