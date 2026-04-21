import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation'
import ActivitiesPage from '../pages/ActivitiesPage'
import CoursesPage from '../pages/CoursesPage'
import DetailPage from '../pages/DetailPage'
import EventsPage from '../pages/EventsPage'
import FilterPage from '../pages/FilterPage'
import NotFoundPage from '../pages/NotFoundPage'
import OrderDetailPage from '../pages/OrderDetailPage'
import OrdersFilterPage from '../pages/OrdersFilterPage'
import OrdersPage from '../pages/OrdersPage'
import StatsPage from '../pages/StatsPage'

const AppRouter = () => (
  <BrowserRouter>
    <div className="app">
      <Navigation />
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/orders" replace />}
            caseSensitive
          />
          <Route path="/orders" element={<OrdersPage />} caseSensitive />
          <Route
            path="/orders/filter"
            element={
              <FilterPage
                title="Filter Orders"
                collectionKey="orders"
                itemTestId="order-item"
              />
            }
            caseSensitive
          />
          <Route
            path="/orders/compact/:id"
            element={<OrderDetailPage />}
            caseSensitive
          />
          <Route path="/orders/:id" element={<OrderDetailPage />} caseSensitive />
          <Route path="/order/:id" element={<OrderDetailPage />} caseSensitive />
          <Route path="/filter" element={<OrdersFilterPage />} caseSensitive />

          <Route path="/activities" element={<ActivitiesPage />} caseSensitive />
          <Route
            path="/activities/filter"
            element={
              <FilterPage
                title="Filter Activities"
                collectionKey="activities"
                itemTestId="activity-item"
              />
            }
            caseSensitive
          />
          <Route
            path="/activities/:id"
            element={
              <DetailPage title="Activity Details" collectionKey="activities" />
            }
            caseSensitive
          />

          <Route path="/courses" element={<CoursesPage />} caseSensitive />
          <Route
            path="/courses/filter"
            element={
              <FilterPage
                title="Filter Courses"
                collectionKey="courses"
                itemTestId="course-item"
              />
            }
            caseSensitive
          />
          <Route
            path="/courses/:id"
            element={<DetailPage title="Course Details" collectionKey="courses" />}
            caseSensitive
          />

          <Route path="/events" element={<EventsPage />} caseSensitive />
          <Route
            path="/events/filter"
            element={
              <FilterPage
                title="Filter Events"
                collectionKey="events"
                itemTestId="event-item"
              />
            }
            caseSensitive
          />
          <Route
            path="/events/:id"
            element={<DetailPage title="Event Details" collectionKey="events" />}
            caseSensitive
          />

          <Route path="/stats" element={<StatsPage />} caseSensitive />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
)

export default AppRouter
