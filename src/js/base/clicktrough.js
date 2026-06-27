export const clickTroughInit = () => {
    const $clicktroughs = document.querySelectorAll('.clicktrough');
    
    if($clicktroughs) {
        $clicktroughs.forEach($clicktrough => {
            const $btn = $clicktrough.querySelector('.btn');
        
            $clicktrough.addEventListener('mouseenter', () => {
                $clicktrough.classList.add('clicktrough-active');
        
                if($btn) {
                    $btn.classList.add('active');
                }
            });
            
            $clicktrough.addEventListener('mouseleave', () => {
                $clicktrough.classList.remove('clicktrough-active');
        
                if($btn) {
                    $btn.classList.remove('active');
                }
            });
        })
    }
}