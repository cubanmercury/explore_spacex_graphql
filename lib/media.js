import styled from 'styled-components'
import { createMedia } from '@artsy/fresnel'
import { useMediaQuery, toQuery } from 'react-responsive'

const breakpoints = {
  s: parseInt("350px"),
  m: parseInt("700px"),
  l: parseInt("950px"),
  xl: parseInt("1200px")
}
function atQuery(breakpoint) {
  const minWidth = breakpoints[breakpoint]

  let maxWidth
  for (let breakpointWidth of Object.values(breakpoints)) {
    if (breakpointWidth > minWidth) {
      maxWidth = breakpointWidth
      break
    }
    if (maxWidth) {
      return toQuery({
        minWidth,
        maxWidth: parseInt(maxWidth) - 0.02
      })
    } else {
      return toQuery({
        minWidth
      })
    }
  }
}

function lessThanQuery(breakpointOrWidth) {
  const maxWidth = breakpoints[breakpointOrWidth] || breakpointOrWidth

  return toQuery({
    maxWidth: parseInt(maxWidth) - 0.02
  })
}

function greaterThanQuery(breakpointOrWidth) {
  const breakpointWidth = breakpoints[breakpointOrWidth]
  let minWidth
  if (breakpointWidth !== undefined) {
    let nextBreakpointWidth
    for (let width of Object.values(breakpoints)) {
      if (width > breakpointWidth) {
        nextBreakpointWidth = width
        break
      }
    }

    // If next breakpoint doesn't exist, use value that will never exist
    minWidth = nextBreakpointWidth || 99999
  } else {
    minWidth = parseInt(breakpointOrWidth) + 0.02
  }

  return toQuery({
    minWidth
  })
}

function greaterThanOrEqualQuery(breakpointOrWidth) {
  const minWidth = breakpoints[breakpointOrWidth] || breakpointOrWidth

  return toQuery({
    minWidth: minWidth
  })
}

function betweenQuery(minBreakpointOrWidth, maxBreakpointOrWidth) {
  const minWidth = breakpoints[minBreakpointOrWidth] || minBreakpointOrWidth
  const maxWidth = breakpoints[maxBreakpointOrWidth] || maxBreakpointOrWidth

  return toQuery({
    minWidth,
    maxWidth: parseInt(maxWidth) - 0.02
  })
}

function createUseMedia() {
  return {
    at: breakpoint => {
      return useMediaQuery({
        query: atQuery(breakpoint)
      })
    },
    lessThan: breakpointOrWidth => {
      return useMediaQuery({
        query: lessThanQuery(breakpointOrWidth)
      })
    },
    greaterThan: breakpointOrWidth => {
      return useMediaQuery({
        query: greaterThanQuery(breakpointOrWidth)
      })
    },
    greaterThanOrEqual: breakpointOrWidth => {
      return useMediaQuery({
        query: greaterThanOrEqualQuery(breakpointOrWidth)
      })
    },
    between: (minBreakpointOrWidth, maxBreakpointOrWidth) => {
      return useMediaQuery({
        query: betweenQuery(minBreakpointOrWidth, maxBreakpointOrWidth)
      })
    }
  }
}

function createMediaQuery() {
  return {
    at: breakpoint => `@media ${atQuery(breakpoint)}`,
    lessThan: breakpointOrWidth => `@media ${lessThanQuery(breakpointOrWidth)}`,
    greaterThan: breakpointOrWidth => `@media ${greaterThanQuery(breakpointOrWidth)}`,
    greaterThanOrEqual: breakpointOrWidth => `@media ${greaterThanOrEqualQuery(breakpointOrWidth)}`,
    between: (minBreakpointOrWidth, maxBreakpointOrWidth) =>
      `@media ${betweenQuery(minBreakpointOrWidth, maxBreakpointOrWidth)}`
  }
}

function createFresnelMedia() {
  const { Media, MediaContextProvider, createMediaStyle } = createMedia({
    breakpoints: {
      _: 0,
      ...breakpoints
    }
  })

  // Create Elem wrapper for Media to style it as any other component
  const MediaWrapper = styled.div`
    /* Stretch flesnel container to full size of wrapper */
    > div {
      width: 100%;
      height: 100%;
    }
  `

  const WrappedMedia = props => (
    <MediaWrapper {...props}>
      <Media {...props}>{props.children}</Media>
    </MediaWrapper>
  )

  return {
    Media: WrappedMedia,
    MediaContextProvider,
    mediaStyle: createMediaStyle()
  }
}

export const { Media, MediaContextProvider, mediaStyle } = createFresnelMedia()
export const useMedia = createUseMedia()
export const mediaQuery = createMediaQuery()