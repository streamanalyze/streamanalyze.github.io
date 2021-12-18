# Using FFT to to a spectral search to identify classes

This guide is based on [identyfying sounds](/docs/md/tutorial/sounds) from the tutorial with some minor modifications.

```OSQL
create function sound_anomaly(Charstring id) -> Bag of Vector of Integer fv
  /* The feature vector for anomaly named `id` */
  as stored;
    
create function top_indices(Vector of Number v, Integer k) 
                          -> Vector of Integer
  /* Indices of `k` largest elements in `v` */
  as select Vector of i
       from Integer i, Number x
      where x = v[i]
      order by x desc
      limit k;
            
clear_function("sound_anomaly");

// Add data
add sound_anomaly("low_voltage") = top_indices((select abs(rfft(w))
               from Vector of Number w
              where  w in winagg((select stream of v[1]
                                    from Vector v
                                   where v in class_stream(2)),1024,1024)),3);
add sound_anomaly("normal") = top_indices((select abs(rfft(w))
               from Vector of Number w
              where  w in winagg((select stream of v[1]
                                    from Vector v
                                   where v in class_stream(2)),1024,1024)),3);
add sound_anomaly("object") = top_indices((select abs(rfft(w))
               from Vector of Number w
              where  w in winagg((select stream of v[1]
                                    from Vector v
                                   where v in class_stream(3)),1024,1024)),3);
                                   
                                   
add sound_anomaly("obstructed") = top_indices((select abs(rfft(w))
               from Vector of Number w
              where  w in winagg((select stream of v[1]
                                    from Vector v
                                   where v in class_stream(4)),1024,1024)),3);
  
  
{'sa_plot': 'p-coords', 'batch':1, "color_axis": 1};
select vector of concat([cls],v)
  from vector of Number v, Number cls
 where v in sound_anomaly(class_name(cls))
   and cls in [1,2,3,4];
   
   
   
   
select Stream of [class, an]
        from vector of Vector of number v, Charstring an, Number class
       where class in range(4)
         and v  in winagg(class_stream(class,false), 1024, 1024)
         and an = closest_anomaly(top_indices(abs(rfft(transpose(v)[1])),3),0); 
                                     
```