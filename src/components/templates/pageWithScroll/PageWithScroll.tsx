import { FC } from 'react'

interface PropsPageWithScroll {
  anchor: string
}
const PageWithScroll: FC<PropsPageWithScroll> = ({
  anchor,
}) => {
  const menuHeight = document.getElementById('menu')
    ?.offsetHeight
  return (
    <section
      onScroll={() => (window.location.hash = anchor)}
      id={anchor}
      style={{
        backgroundColor: 'black',
        color: 'white',
        height: `calc(100vh - ${menuHeight}px)`,
        overflow: 'overlay',
        width: '100%',
        fontSize: '3rem',
        paddingTop: menuHeight,
      }}
    >
      <div
        style={{
          width: '80%',
          margin: '20px auto',
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Quisquam nesciunt necessitatibus consequatur,
        hic perferendis tempora illo sint veritatis
        voluptas, neque voluptatem deserunt voluptatum optio
        nemo consequuntur quos error blanditiis quae!
      </div>
      <div
        style={{
          width: '80%',
          margin: '20px auto',
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Quisquam nesciunt necessitatibus consequatur,
        hic perferendis tempora illo sint veritatis
        voluptas, neque voluptatem deserunt voluptatum optio
        nemo consequuntur quos error blanditiis quae!
      </div>
      <div
        style={{
          width: '80%',
          margin: '20px auto',
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Quisquam nesciunt necessitatibus consequatur,
        hic perferendis tempora illo sint veritatis
        voluptas, neque voluptatem deserunt voluptatum optio
        nemo consequuntur quos error blanditiis quae!
      </div>
      <div
        style={{
          width: '80%',
          margin: '20px auto',
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Quisquam nesciunt necessitatibus consequatur,
        hic perferendis tempora illo sint veritatis
        voluptas, neque voluptatem deserunt voluptatum optio
        nemo consequuntur quos error blanditiis quae!
      </div>
      <div
        style={{
          width: '80%',
          margin: '20px auto',
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Quisquam nesciunt necessitatibus consequatur,
        hic perferendis tempora illo sint veritatis
        voluptas, neque voluptatem deserunt voluptatum optio
        nemo consequuntur quos error blanditiis quae!
      </div>
      <div
        style={{
          width: '80%',
          margin: '20px auto',
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Quisquam nesciunt necessitatibus consequatur,
        hic perferendis tempora illo sint veritatis
        voluptas, neque voluptatem deserunt voluptatum optio
        nemo consequuntur quos error blanditiis quae!
      </div>
      <div
        style={{
          width: '80%',
          margin: '20px auto',
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Quisquam nesciunt necessitatibus consequatur,
        hic perferendis tempora illo sint veritatis
        voluptas, neque voluptatem deserunt voluptatum optio
        nemo consequuntur quos error blanditiis quae!
      </div>
      <div
        style={{
          width: '80%',
          margin: '20px auto',
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Quisquam nesciunt necessitatibus consequatur,
        hic perferendis tempora illo sint veritatis
        voluptas, neque voluptatem deserunt voluptatum optio
        nemo consequuntur quos error blanditiis quae!
      </div>
    </section>
  )
}

export default PageWithScroll
