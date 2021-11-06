const Hamburger = ({ isOpen }) => {

    return (
      <>
      <div className="hamburger">
        <div className="burger burger1" />
        <div className="burger burger2" />
        <div className="burger burger3" />
      </div>

      <style jsx="true">{`
        // .hamburger {
        //   width: 2rem;
        //   height: 2rem;
        //   display: flex;
        //   justify-content: space-around;
        //   flex-flow: column nowrap;
        //   z-index: 10;
        // }

        .hamburger {
          display: none;
        }
      
        .burger {
          width: 2rem;
          height: 0.25rem;
          border-radius: 10px;
          background-color: white;
          margin: 0.2rem;
          transform-origin: 1px;
          transition: all 0.3s linear;
        }

        .burger1 {
          transform: ${ isOpen ? 'rotate(45deg)' : 'rotate(0)'};
        }

        .burger2 {
          transform: ${ isOpen ? 'translateX(100%)' : 'translateX(0)'};
          opacity: ${isOpen ? 0 : 1};
        }

        .burger3 {
          transform: ${ isOpen ? 'rotate(-45deg)' : 'rotate(0)'}
        }
        
        @media (max-width: 767px) {
          .hamburger {
            // display: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding-top: 10px;
            // margin-left: 10px;
            z-index: 10;
          }
        }
    `}</style>
      </>
    )
}


export default Hamburger;