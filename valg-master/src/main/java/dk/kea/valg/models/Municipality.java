package dk.kea.valg.models;

;
import lombok.Data;

import javax.persistence.*;


@Data
@Table(name = "municipalities")
@Entity
public class Municipality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

}
